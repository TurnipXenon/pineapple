import type { BehaviorNode } from "$pkg/components/dialog_manager/behavior_tree/core/BehaviorNode";
import type { LineNodeArguments } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$pkg/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";

export type LineBehaviorNode = BehaviorNode<LineNodeArguments, LineBehaviorResult>;
