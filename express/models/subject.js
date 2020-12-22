'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  subject.init({
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.TEXT('medium'),
    filename: DataTypes.STRING,
    filepath: DataTypes.STRING,
    checklist: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('checklist'));
      },
      set: function(val) {
        return this.setDataValue('checklist', JSON.stringify(val));
      }
    },
    exp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject',
  });
  return subject;
};
