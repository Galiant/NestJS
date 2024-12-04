const highSalary = {
  conditions: {
    all: [
      {
        fact: 'salary',
        operator: 'greaterThan',
        value: 50000,
      },
    ],
  },
  event: {
    type: 'highEarner',
    params: {
      message: 'User has a high salary.',
    },
  },
};

export default highSalary;
