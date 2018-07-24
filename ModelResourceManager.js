//模型类
function createModel(type,pos,roatation,scale,bigModelPos)
{
	let dataModel = new DataBundle(type,pos,roatation,scale);
	let modelUrl;
    switch (type)
    {
        case (type==1):
            modelUrl  = "resource/imga.jpg";
            break;
        case(type==2):
            modelUrl = "resource/imgb.jpg";
            break;
        case(type==3):
            modelUrl = "resource/imgc.jpg";
            break;
        case(type == 4):
            modelUrl = "resource/imgd.jpg";
            break;
    }
    objectLoader.load(modelUrl, function (geometry, materials) {
        let loader = new THREE.TextureLoader();
        loader.load("pngurl", function (texture) {
            let material = new THREE.MeshPhongMaterial({ map: texture });
            geometry.center();
            let dataModel = new Physijs.BoxMesh(geometry, Physijs.createMaterial(material, 1, 0.1), 10);
            dataModel.scale.set(scale);
            dataModel.morphTargets = true;
            dataModel.position.set(pos); //(objectx.max.y - objectx.min.y) / 2
            dataModel.castShadow = true;
            dataModel.receiveShadow = true;
        });
    });

	let bigModel = new DataBundle(bigModelPos);
	bigModel.add(dataModel);
	bigModel.position.set(bigModelPos);
}

function destoryModel(bigModel)
{
	parent.removeChild(bigModel);
}
//数据类
function DataBundle(type,pos,rotation,scale,bigModelPos)
{
	this.modelType = type;
	this.modePos=pos;
	this.modelRotation = rotation;
	this.modelScale = scale;
	this.bigModelPos = bigModelPos;
}
let objectLoader = new THREE.JSONLoader();
let renderer = new THREE.WebGLRenderer();
let schedule = 0;
let objPath = "";
let dataPath = "";
let banjing = 10;
let resData;

//   载入模型
function LoadResource(_path)
{
	for(let i = 0;i< resData.length();i++)
	{
		let range = resData.get(i);
        if(localStorage.getItem('range') == null&&localStorage.getItem('range') == "")
        {
            localStorage.name = range;
        }else
        {
            localStorage.setItem('range',range);
        }
	}

}
//载入 几何体配置数据 xml文件？txt文件？excel?都可以配置 
function LoadData(_path)
{
	let range = localStorage["range"];
	for(let i = 0;i<range.length();i++)
	{
		let schedule = parseFloat(range[i].get(0));
		let j = 0;
		for(j;j< range[i].length();j++)
		{
			for(let k = 0;k<range[i][1].length();k++)
			{
                let type = parseInt(range[i][1][k].get(0));
                let pos = parseFloat(range[i][1][k].get(1));
                let rotation = parseFloat(range[i][1][k].get(2));
                let scale = parseInt(range[i][1][k].get(3));
                let bigModelPos = parseFloat(range[i][2][k]);
                createModel(type,pos,rotation,scale,bigModelPos);
			}

		}
		let bigModelPos = parseFloat(range[i].get(2));
	}
}
//传出模型数据
function ExportModel(_thisPos,_schedule)
{
	let viewX = _thisPos.x;
	let viewY = _thisPos.y;
	let viewZ = _thisPos.z;
	let maxCreateRange = parseFloat(_thisPos) + banjing;
    let range = localStorage["range"];
    for(let i = 0;i<range.length();i++)
    {
        let schedule = parseFloat(range[i].get(0));
        let j = 0;
        for(j;j< range[i].length();j++)
        {
            for(let k = 0;k<range[i][1].length();k++)
            {
                let type = parseInt(range[i][1][k].get(0));
                let pos = parseFloat(range[i][1][k].get(1));
                let rotation = parseFloat(range[i][1][k].get(2));
                let scale = parseInt(range[i][1][k].get(3));
                let bigModelPos = parseFloat(range[i][2][k]);
                let posX = bigModelPos.x;
                let posY = bigModelPos.y;
                let posZ = bigModelPos.z;
                let destence = Math.sqrt(Math.pow(Math.sin((viewX - posX) / 2), 2) + Math.cos(viewX) * Math.cos(posX) * Math.pow(Math.sin((viewY*Math.PI/180 - posY*Math.PI/180) / 2), 2))
                if(destence <= banjing)
                {
                    createModel(type,pos,rotation,scale,bigModelPos);
                }else
                	{
                		destoryModel(type,pos,rotation,scale,bigModelPos);
					}
            }

        }

    }

}



