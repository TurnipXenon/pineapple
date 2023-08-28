import type { BehaviorNode } from "$lib/components/dialog_manager/behavior_tree/core/BehaviorNode";
import type { LineNodeArguments } from "$lib/components/dialog_manager/behavior_tree/line_core/LineNodeArguments";
import type { LineBehaviorResult } from "$lib/components/dialog_manager/behavior_tree/line_core/LineBehaviorResult";

export type LineBehaviorNode = BehaviorNode<LineNodeArguments, LineBehaviorResult>;
