
export default function customerMapper(data) {
    const newCustomer = data.map((customer) => ({
      id: customer.accountId,
      name: customer.name,
      username: customer.username,
      email: customer.email,
      avatar: customer.avatar,
      phoneNumber: customer.phoneNumber,
      identityCardNumber: customer.identityCardNumber,
      exchange: customer.garbageManagement.exchange,
      street: customer.address.street,
      district: customer.address.district,
      provinceOrCity: customer.address.provinceOrCity,
    }));
    return {
      customers: newCustomer || [],
      totalCustomer: newCustomer.length
    };
  }
  