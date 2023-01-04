const { json } = require("express");
const Research = require("../models/research");
module.exports = {
    add: async (req, res) => {
    try {
      const body = req.body;
      const Research = await Research.create(body);
      if (!Research) {
        return res.status(400).json({
          message: "Research not created",
        });
      } else {
        return res.status(201).json({
          message: "Research created",
        });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  update: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const Research = await Research.findByIdAndUpdate(_id, body);
      if (!Research) {
        return res.status(400).json({ message: "Research not updated" });
      } else {
        res.status(200).json({ message: "Research updated" });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  delete: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const Research = await Research.findByIdAndRemove(_id);
      if (!Research) {
        res.status(400).json({ message: "Research not deleted" });
      } else {
        res.status(200).json({ message: "Research deleted" });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  getAll: async (req, res) => {
    try {
      const body = req.body;
      const Research = await Research.find(body);
      if (!Research) {
        res.status(400).json({ message: "Research not found" });
      } else {
        res.status(200).json({ message: "Research found", data: Research });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  getOne: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const Research = await Research.findById(_id);
      if (!Research) {
        res.status(400).json({ message: "Research not found" });
      } else {
        res.status(200).json({ message: "Research found", data: Research });
      }
    } catch (e) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  },
};
