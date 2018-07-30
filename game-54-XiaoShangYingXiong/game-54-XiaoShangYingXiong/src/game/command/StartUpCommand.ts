/**
 *
 * 开始命令:使用过后会自动注册
 * @author 
 *
 */
module game {
  export class StartUpCommand extends puremvc.MacroCommand {
        public constructor() {
            super();
        }

        public initializeMacroCommand(): void {
            this.addSubCommand(ControllerPrepCommand);
            this.addSubCommand(ModelPrepCommand);
            this.addSubCommand(ViewPrepCommand);
        }
    }
}