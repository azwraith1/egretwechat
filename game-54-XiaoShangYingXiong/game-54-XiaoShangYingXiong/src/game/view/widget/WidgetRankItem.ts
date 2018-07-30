/**
 *
 * @author 
 *
 */
module game {
    export class WidgetRankItem extends eui.ItemRenderer {
        public constructor() {
            super();
            this.skinName = new WidgetRankListItemSkin();
            this.rankImage.x -= 10;
        }


        private isSelf: boolean = false;
        private rankItemBg: eui.Image;
        private rankLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private scoreLabel: eui.Label;
        private helpLabel: eui.Label;
        private rankImage: eui.Image;
        private rankData: any;

        private zhuliGroup: eui.Group;
        private ptGroup: eui.Group
        private zhuliNameLabel: eui.Label;
        private zhuliScoreLabel: eui.Label;
        private zhuliCountLabel: eui.BitmapLabel;

        public setSelf() {
            this.rankItemBg.source = RES.getRes('img_rankmine_png');
            this.zhuliNameLabel.textColor = 0x94ff89;
            this.zhuliScoreLabel.textColor = 0x94ff89;
            this.nameLabel.textColor = 0x94ff89;
            this.scoreLabel.textColor = 0x94ff89;
            this.helpLabel.textColor = 0x94ff89;
        }

        protected dataChanged() {
            this.updateShow(this.data);
        }
        
        public changeMyItem(data: any){
            if(!data.rank) {
                this.zhuliGroup.visible = true;
                this.ptGroup.visible = false;
                this.zhuliNameLabel.text = Utils.getMaxStr(data.nickname);
                this.zhuliScoreLabel.text = data.ass_score || '0';
                this.zhuliCountLabel.text = data.ass_num || '0';
            } else {
                this.zhuliGroup.visible = false;
                this.ptGroup.visible = true;
                if(parseInt(data.rank) <= 4) {
                    this.rankLabel.text = '';
                    this.rankImage.visible = true;
                    this.rankImage.source = RES.getRes('rank' + data.rank + "_png");
                } else {
                    this.rankLabel.text = data.rank;
                    this.rankImage.visible = false;
                }
                this.nameLabel.text = Utils.getMaxStr(data.nickname.toString());
                this.scoreLabel.text = data.total_score || '0';
                this.helpLabel.text = data.ass_num || '0';
            }
        
        }
        
        
        public updateShow(data: any) {
            if (!data.id) {
                this.zhuliGroup.visible = true;
                this.ptGroup.visible = false;
                this.zhuliNameLabel.text = Utils.getMaxStr(data.nickname);
                this.zhuliScoreLabel.text = data.ass_score || '0';
                this.zhuliCountLabel.text = data.ass_num || '0';
            } else {
                this.zhuliGroup.visible = false;
                this.ptGroup.visible = true;
                if(parseInt(data.id) <= 4) {
                    this.rankLabel.text = '';
                    this.rankImage.visible = true;
                    this.rankImage.source = RES.getRes('rank' + data.id + "_png");
                } else {
                    this.rankLabel.text = data.id.toString();
                    this.rankImage.visible = false;
                }
                this.nameLabel.text = Utils.getMaxStr(data.nickname.toString());
                this.scoreLabel.text = data.total_score || '0';
                this.helpLabel.text = data.ass_num || '0';
            }
        }
    }
}
