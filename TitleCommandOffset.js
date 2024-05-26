/*:
 * @plugindesc タイトル画面のコマンド位置を変更するプラグインです。
 * @author atyamaru
 * 
 * @param Command2X
 * @type number
 * @min -9999
 * @max 9999
 * @desc 2つ目のコマンドのX座標のずれ
 * @default 10
 * 
 * @param Command2Y
 * @type number
 * @min -9999
 * @max 9999
 * @desc 2つ目のコマンドのY座標のずれ
 * @default 10
 * 
 * @param Command3X
 * @type number
 * @min -9999
 * @max 9999
 * @desc 3つ目のコマンドのX座標のずれ
 * @default 20
 * 
 * @param Command3Y
 * @type number
 * @min -9999
 * @max 9999
 * @desc 3つ目のコマンドのY座標のずれ
 * @default 20
 * 
 * @help タイトル画面の2つ目と3つ目のコマンドの位置を変更します。
 */

(function() {
    var parameters = PluginManager.parameters('TitleCommandOffset');
    var command2X = Number(parameters['Command2X'] || 10);
    var command2Y = Number(parameters['Command2Y'] || 10);
    var command3X = Number(parameters['Command3X'] || 20);
    var command3Y = Number(parameters['Command3Y'] || 20);

    // 元のメソッドを保存
    const _Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
    const _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;

    // コンストラクタで初期化
    Window_TitleCommand.prototype.initialize = function() {
        _Window_TitleCommand_initialize.call(this);
        this._command2X = command2X;
        this._command2Y = command2Y;
        this._command3X = command3X;
        this._command3Y = command3Y;
    };

    // ウィンドウ位置を更新するメソッドをオーバーライド
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        this.y = Graphics.boxHeight - this.height - 96; // 必要に応じて調整
    };

    // コマンドの描画位置を変更するメソッドをオーバーライド
    Window_TitleCommand.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        if (index === 1) {
            rect.x += this._command2X;
            rect.y += this._command2Y;
        } else if (index === 2) {
            rect.x += this._command3X;
            rect.y += this._command3Y;
        }
        return rect;
    };
})();
