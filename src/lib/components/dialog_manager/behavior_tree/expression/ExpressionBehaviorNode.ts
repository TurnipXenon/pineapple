import type { BehaviorNode } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorNode";
import type { ExpressionArguments } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionArguments";
import type { ExpressionResult } from "$lib/components/dialog_manager/behavior_tree/expression/ExpressionResult";

export type ExpressionBehaviorNode = BehaviorNode<ExpressionArguments, ExpressionResult>;
