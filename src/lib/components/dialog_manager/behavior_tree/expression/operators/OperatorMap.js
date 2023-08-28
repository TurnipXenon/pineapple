import { EqualityOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/EqualityOperator";
import { InequalityOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/InequalityOperator";
import { GreaterThanOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/GreaterThanOperator";
import { GreaterThanEqualOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/GreaterThanEqualOperator";
import { LessThanOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/LessThanOperator";
import { LessThanEqualOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/LessThanEqualOperator";
import { NegationOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/NegationOperator";
import { AndOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/AndOperator";
import { OrOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/OrOperator";
import { XorOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/XorOperator";
import { AddOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/arithmetic/PlusOperator";
import { MinusOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/arithmetic/MinusOperator";
import { MultiplicationOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/arithmetic/MultiplicationOperator";
import { DivisionOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/arithmetic/DivisionOperator";
import { RemainderDivisionOperator } from "$lib/components/dialog_manager/behavior_tree/expression/operators/arithmetic/RemainderDivisionOperator";
class OperatorMap {
    _operatorLogicMap = new Map();
    constructor() {
        // set up operator logic
        [
            new EqualityOperator(),
            new InequalityOperator(),
            new GreaterThanOperator(),
            new GreaterThanEqualOperator(),
            new LessThanOperator(),
            new LessThanEqualOperator(),
            new NegationOperator(),
            new AndOperator(),
            new OrOperator(),
            new XorOperator(),
            new AddOperator(),
            new MinusOperator(),
            new MultiplicationOperator(),
            new DivisionOperator(),
            new RemainderDivisionOperator()
        ].forEach((operatorLogic) => {
            this._operatorLogicMap.set(operatorLogic.getToken(), operatorLogic);
        });
    }
    get = (operator) => {
        return this._operatorLogicMap.get(operator);
    };
    exists = (operator) => {
        return this.get(operator) !== undefined;
    };
}
export const operatorMap = new OperatorMap();
//# sourceMappingURL=OperatorMap.js.map