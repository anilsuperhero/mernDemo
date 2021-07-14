const Notification = require("../../models/Notification");
const { responseData } = require("../../helpers/responseData");
const { response } = require("../../resources/response");

module.exports = {
  createNotification: async (req, res) => {
    try {
      const { title, description, action, user_id } = req.body;
      var notification = new Notification();
      notification.title = title;
      notification.description = description;
      notification.action = action;
      notification.user_id = user_id;
      notification.save(async function (err) {
        if (err) {
          return res.status(422).json(responseData(err.message, {}, 422));
        } else {
          return res.json(
            responseData("Notification has been sent successfully.")
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  deleteAll: async (req, res) => {
    try {
      await Notification.deleteMany({ user_id: req.user_id }, (err, result) => {
        return res.json(responseData("NOTIFICATION_REMOVE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  getNotification: async (req, res) => {
    try {
      let { page, sort, direction } = req.query;
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: ["title", "description", "status", "created_at"],
      };
      var query = { user_id: req.user_id };
      Notification.paginate(query, options, async function (err, result) {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        const data = await response(result);
        const notificationCount = await Notification.countDocuments({
          status: 0,
          user_id: req.user_id,
        }).exec();
        return res.json(
          responseData("DATA_RECEIVED", {
            item: data,
            count: notificationCount,
          })
        );
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await Notification.deleteOne({ _id: id }, (err, result) => {
        return res.json(responseData("NOTIFICATION_DELETE", result));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      await Notification.updateMany(
        { user_id: req.user_id },
        { status: 1 },
        async (err, result) => {
          return res.json(responseData(""));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
