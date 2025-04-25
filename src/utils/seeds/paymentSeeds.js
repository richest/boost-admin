import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const paymentSeeds = [...Array(24)].map((_, index) => ({
    name: faker.name.fullName(),
    transactionid: faker.datatype.uuid(),
    // date_time: `${faker.random.numeric()} ${sample(['Jan', 'Feb', 'Mar'])}`,
    date_time: `${faker.date.recent()}`,
    amount: faker.finance.amount(),
    status: sample(['success', 'failed', 'pending']),
}));

export default paymentSeeds;
