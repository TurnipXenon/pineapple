import fs from "fs";
// from https://stackoverflow.com/a/26832802
export const getDirectories = (path) => {
    return fs
        .readdirSync(path)
        .filter(function (file) {
        return fs.statSync(path + "/" + file).isDirectory();
    })
        .map((value) => {
        return path + "/" + value;
    });
};
/**
 * Get all files underneath a path. The results can be filtered!
 * @param path: path where to start finding all files underneath
 * @param filter?: optional path filter
 */
export const getAllFiles = (path, filter) => {
    const contentList = fs.readdirSync(path);
    const fileList = [];
    contentList.forEach((content) => {
        const contentName = path + "/" + content;
        const stat = fs.statSync(contentName);
        if (stat.isDirectory()) {
            fileList.push(...getAllFiles(contentName, filter));
        }
        else {
            // takes advantage of lazy evaluation
            if (filter === undefined || filter(contentName)) {
                fileList.push(contentName);
            }
        }
    });
    return fileList;
};
//# sourceMappingURL=FileManagement.js.map