/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var WidgetRankItem = (function (_super) {
        __extends(WidgetRankItem, _super);
        function WidgetRankItem() {
            _super.call(this);
            this.isSelf = false;
            this.skinName = new WidgetRankListItemSkin();
            this.rankImage.x -= 10;
        }
        var d = __define,c=WidgetRankItem,p=c.prototype;
        p.setSelf = function () {
            this.rankItemBg.source = RES.getRes('img_rankmine_png');
            this.zhuliNameLabel.textColor = 0x94ff89;
            this.zhuliScoreLabel.textColor = 0x94ff89;
            this.nameLabel.textColor = 0x94ff89;
            this.scoreLabel.textColor = 0x94ff89;
            this.helpLabel.textColor = 0x94ff89;
        };
        p.dataChanged = function () {
            this.updateShow(this.data);
        };
        p.changeMyItem = function (data) {
            if (!data.rank) {
                this.zhuliGroup.visible = true;
                this.ptGroup.visible = false;
                this.zhuliNameLabel.text = game.Utils.getMaxStr(data.nickname);
                this.zhuliScoreLabel.text = data.ass_score || '0';
                this.zhuliCountLabel.text = data.ass_num || '0';
            }
            else {
                this.zhuliGroup.visible = false;
                this.ptGroup.visible = true;
                if (parseInt(data.rank) <= 4) {
                    this.rankLabel.text = '';
                    this.rankImage.visible = true;
                    this.rankImage.source = RES.getRes('rank' + data.rank + "_png");
                }
                else {
                    this.rankLabel.text = data.rank;
                    this.rankImage.visible = false;
                }
                this.nameLabel.text = game.Utils.getMaxStr(data.nickname.toString());
                this.scoreLabel.text = data.total_score || '0';
                this.helpLabel.text = data.ass_num || '0';
            }
        };
        p.updateShow = function (data) {
            if (!data.id) {
                this.zhuliGroup.visible = true;
                this.ptGroup.visible = false;
                this.zhuliNameLabel.text = game.Utils.getMaxStr(data.nickname);
                this.zhuliScoreLabel.text = data.ass_score || '0';
                this.zhuliCountLabel.text = data.ass_num || '0';
            }
            else {
                this.zhuliGroup.visible = false;
                this.ptGroup.visible = true;
                if (parseInt(data.id) <= 4) {
                    this.rankLabel.text = '';
                    this.rankImage.visible = true;
                    this.rankImage.source = RES.getRes('rank' + data.id + "_png");
                }
                else {
                    this.rankLabel.text = data.id.toString();
                    this.rankImage.visible = false;
                }
                this.nameLabel.text = game.Utils.getMaxStr(data.nickname.toString());
                this.scoreLabel.text = data.total_score || '0';
                this.helpLabel.text = data.ass_num || '0';
            }
        };
        return WidgetRankItem;
    }(eui.ItemRenderer));
    game.WidgetRankItem = WidgetRankItem;
    egret.registerClass(WidgetRankItem,'game.WidgetRankItem');
})(game || (game = {}));
