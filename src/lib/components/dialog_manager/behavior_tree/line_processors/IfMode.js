// interpreter states
export var IfMode;
(function (IfMode) {
    IfMode[IfMode["Search"] = 0] = "Search";
    IfMode[IfMode["Ignore"] = 1] = "Ignore";
    IfMode[IfMode["Evaluated"] = 2] = "Evaluated";
    IfMode[IfMode["EvaluateNext"] = 3] = "EvaluateNext"; // find the next elseif, else, or endif and evaluate if possible
})(IfMode || (IfMode = {}));
//# sourceMappingURL=IfMode.js.map