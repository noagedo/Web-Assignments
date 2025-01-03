"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comment_1 = __importDefault(require("../controllers/comment"));
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - postId
 *         - content
 *       properties:
 *         postId:
 *           type: string
 *           description: The ID of the post this comment belongs to
 *         content:
 *           type: string
 *           description: The content of the comment
 *       example:
 *         postId: '1234'
 *         content: 'This is a comment'
 */
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Creates a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *      400:
 *        description: Bad request
 *     500:
 *       description: Internal server error
 */
router.post("/", comment_1.default.createComment);
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Gets all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *      400:
 *       description: Bad request
 *    500:
 *     description: Internal server error
 */
router.get("/", comment_1.default.getAllComments);
/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Gets all comments for a specific post by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post for which to retrieve comments
 *     responses:
 *       200:
 *         description: List of comments for the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *     400:
 *      description: Bad request
 *   404:
 *    description: Post not found
 */
router.get("/:postId", comment_1.default.getCommentsByPostId);
/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Updates a comment by its ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The updated comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *    400:
 *     description: Bad request
 *  404:
 *  description: Comment not found
 * 500:
 * description: Internal server error
 */
router.put("/:commentId", (req, res) => { comment_1.default.updateComment(req, res); });
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Deletes a comment by its ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: The deleted comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *    400:
 *    description: Bad request
 * 404:
 * description: Comment not found
 * 500:
 * description: Internal server error
 *
 */
router.delete("/:commentId", (req, res) => { comment_1.default.deleteComment(req, res); });
router.delete("/", comment_1.default.deleteAllComments);
exports.default = router;
//# sourceMappingURL=comment.js.map