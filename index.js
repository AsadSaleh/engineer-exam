"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = require("express");
require("dotenv/config"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var prisma = new client_1.PrismaClient();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.set("port", process.env.PORT || 3000);
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ Hi: "there, welcome to this app!" });
        return [2 /*return*/];
    });
}); });
app.get("/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchString, skip, take, orderBy, or, posts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, searchString = _a.searchString, skip = _a.skip, take = _a.take, orderBy = _a.orderBy;
                or = searchString
                    ? {
                        OR: [
                            { title: { contains: searchString } },
                            { content: { contains: searchString } },
                        ]
                    }
                    : {};
                return [4 /*yield*/, prisma.post.findMany({
                        where: __assign({ published: true }, or),
                        take: Number(take) || undefined,
                        skip: Number(skip) || undefined,
                        orderBy: {
                            updatedAt: orderBy
                        }
                    })];
            case 1:
                posts = _b.sent();
                res.json(posts);
                return [2 /*return*/];
        }
    });
}); });
app.post("/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = req.body.title;
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: title
                        }
                    })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.listen(app.get("port"), function () {
    console.log("\uD83D\uDE80 Server ready at: http://localhost:".concat(app.get("port")));
});
