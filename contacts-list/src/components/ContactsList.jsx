const contacts = [
  {
    id: 1,
    name: "Gabriel Bello",
    extension: "123",
    phone: "44999122751",
    email: "bellodealmeidagabriel@gmail.com",
  },
  {
    id: 2,
    name: "Maria Silva",
    extension: "124",
    phone: "44999887766",
    email: "maria.silva@gmail.com",
  },
  {
    id: 3,
    name: "João Souza",
    extension: "125",
    phone: "44991234567",
    email: "joao.souza@gmail.com",
  },
];

export default function ContactsList() {

  return (
    <div className="overflow-x-auto">
      <table className="w-full h-full text-sm text-left border-collapse overflow-hidden text-gray-500 dark-text-gray-400">
        <thead className="text-xs text-black uppercase dark:text-gray-200 bg-gray-50 dark:bg-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-l-md">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Extension
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 rounded-r-md">
              E-mail
            </th>
          </tr>
        </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b dark:border-gray-700 border-gray-200">
                <td
                  scope="row"
                  className="px-6 py-3 font-normal text-gray-900 dark:text-gray-200"
                >
                  {contact.name}
                </td>
                <td className="px-6 py-3 font-normal text-gray-900 dark:text-gray-200">
                  {contact.extension}
                </td>
                <td className="px-6 py-3 font-normal text-gray-900 dark:text-gray-200">
                  {contact.phone}
                </td>
                <td className="px-6 py-3 font-normal text-gray-900 dark:text-gray-200">
                  {contact.email}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}
