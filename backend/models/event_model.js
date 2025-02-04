const { Schema, model } = require("mongoose");

const event = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isLocked: { type: Boolean, default: false },
  booths: [{ type: Schema.Types.ObjectId, ref: "Booth" }],
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  accessCode: String,
  createdAt : {type: Date, default : Date.now}

});

const Event = model("Event", event);

module.exports = Event;
