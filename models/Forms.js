const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormsSchema = new Schema({
  forms: [
    {
      company: {
        type: String,
        required: true,
      },
      questions: {
        type: Object,
        required: true,
      },
      logo: {
        type: Image,
      },
      responses: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: `users`,
          },
          name: {
            type: String,
          },
          answers: {
            type: Object,
            required: true,
          },
          file: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Forms = mongoose.model("form", FormsSchema);
