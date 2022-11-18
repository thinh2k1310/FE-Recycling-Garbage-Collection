
export default function staffMapper(staffs) {
  const newStaffs = staffs.content.map((staff) => ({
    id: staff.id,
    name: staff.name,
    username: staff.username,
    email: staff.email,
    avatar: staff.avatar,
    phoneNumber: staff.phoneNumber,
    identityCardNumber: staff.identityCardNumber,
    collect: staff.garbageManagement.collect,
    street: staff.address.street,
    district: staff.address.district,
    provinceOrCity: staff.address.provinceOrCity,
  }));

  return {
    staffs: newStaffs || [],
    totalPages: staffs.data?.totalPages,
  };
}
