const db = require('../database');
const {Sequelize} = require("sequelize");

exports.changeBalance = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, amount } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'userId param not provided' });
      return;
    }

    if (amount < 0) {
      res.status(400).json({ message: 'amount does not been < 0' });
      return;
    }

    const user = await db.models.User.findByPk(userId, {
      lock: transaction.LOCK.UPDATE,
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.balance < amount) {
      res.status(400).json({ message: 'Insufficient funds on the balance sheet' });
      return;
    }

    await db.models.User.update(
      { balance: Sequelize.literal(`balance - ${amount}`) },
      { where: {id: userId }, transaction },
    );

    await transaction.commit();

    res.status(200).json({ message: 'User amount updated' });
  } catch (e) {
    await transaction.rollback();
    res.status(500).json({ message: 'Change balance failed', error: e });
  }
};
