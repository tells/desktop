var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var NotificationSchema = new Schema({
  to: ObjectId,
  from: ObjectId,
  date: { type: Date, default: Date.now }
});

mongoose.model('Notification', NotificationSchema);