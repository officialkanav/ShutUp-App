const mongoose = require('mongoose');

export function compareId(id1, id2) {
  const mongooseId1 = mongoose.Types.ObjectId(id1);
  const mongooseId2 = mongoose.Types.ObjectId(id2);
  return mongooseId1.equals(mongooseId2);
}
