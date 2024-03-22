import type { OperatorLogicNode } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OperatorLogicNode";
import { EqualityOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/EqualityOperator";
import { InequalityOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/InequalityOperator";
import { GreaterThanOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/GreaterThanOperator";
import { GreaterThanEqualOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/GreaterThanEqualOperator";
import { LessThanOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/LessThanOperator";
import { LessThanEqualOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/LessThanEqualOperator";
import { NegationOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/NegationOperator";
import { AndOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/AndOperator";
import { OrOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/OrOperator";
import { XorOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/XorOperator";
import { AddOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/arithmetic/PlusOperator";
import { MinusOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/arithmetic/MinusOperator";
import { MultiplicationOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/arithmetic/MultiplicationOperator";
import { DivisionOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/arithmetic/DivisionOperator";
import { RemainderDivisionOperator } from "$pkg/components/dialog_manager/behavior_tree/expression/operators/arithmetic/RemainderDivisionOperator";

class OperatorMap {
	_operatorLogicMap: Map<string, OperatorLogicNode> = new Map();

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

	get = (operator: string): OperatorLogicNode | undefined => {
		return this._operatorLogicMap.get(operator);
	};

	exists = (operator: string): boolean => {
		return this.get(operator) !== undefined;
	};
}

export const operatorMap = new OperatorMap();
