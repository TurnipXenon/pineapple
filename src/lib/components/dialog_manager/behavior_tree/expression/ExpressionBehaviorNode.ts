import type { BehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorNode";
import type { ExpressionArguments } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$pkg/components/dialog_manager/behavior_tree/expression/ExpressionResult";

export type ExpressionBehaviorNode = BehaviorNode<ExpressionArguments, ExpressionResult>;
