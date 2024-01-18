import Athlete from './athlete.js';
import Contact from './contact.js';
import Trainer from './trainer.js';
import Payment from './payment.js';

Athlete.hasMany(Payment, { foreignKey: 'athleteId', onDelete: 'CASCADE' });
Payment.belongsTo(Athlete, { foreignKey: 'athleteId', onDelete: 'CASCADE' });

Trainer.hasMany(Athlete, {
  foreignKey: { name: 'trainerId', allowNull: false },
  onDelete: 'CASCADE',
});
Athlete.belongsTo(Trainer, {
  foreignKey: { name: 'trainerId', allowNull: false },
  onDelete: 'CASCADE',
});

Athlete.hasMany(Contact, { foreignKey: 'athleteId', onDelete: 'CASCADE' });
Contact.belongsTo(Athlete, { foreignKey: 'athleteId', onDelete: 'CASCADE' });
