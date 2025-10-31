import { useEffect, useState } from "react";
import { getContacts } from "../services/contactsService";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("getData error: ", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full h-full text-sm text-left border-collapse overflow-hidden text-gray-500 dark-text-gray-400">
        <thead className="text-sm text-black uppercase dark:text-gray-300 bg-gray-50 dark:bg-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-l-md">
              Employee
            </th>
            <th scope="col" className="px-6 py-3">
              E-mails
            </th>
            <th scope="col" className="px-6 py-3">
              Phones
            </th>
            <th scope="col" className="px-6 py-3 rounded-r-md">
              Extension
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-b dark:border-gray-700 border-gray-200"
            >
              <td scope="row" className="px-6 py-2">
                <p className="text-white text-base font-medium text-[0.95rem]">
                  {contact.name}
                </p>
                <p className="text-gray-400 font-medium text-[0.8rem] ">
                  {contact.position} - {contact.department_name}
                </p>
              </td>
              <td className="px-6 py-3 align-top">
                <ul className="space-y-1 text-sm text-gray-300">
                  {contact.emails?.length ? (
                    contact.emails.map((email) => (
                      <li key={email.id} className="flex items-center gap-2">
                        <span className="truncate">{email.email_address}</span>
                        <span className="ml-2 text-[0.8rem] text-gray-400">
                          ({email.type})
                        </span>
                      </li>
                    ))
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </ul>
              </td>

              <td className="px-6 py-3 align-top">
                <ul className="space-y-1 text-sm text-gray-300">
                  {contact.phones?.length ? (
                    contact.phones.map((phone) => (
                      <li key={phone.id} className="flex items-center gap-2">
                        <span className="truncate">{phone.phone_number}</span>
                        <span className="ml-2 text-[0.8rem] text-gray-400">
                          ({phone.type})
                        </span>
                      </li>
                    ))
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </ul>
              </td>
              <td className="px-6 py-3 font-normal text-base text-gray-900 dark:text-gray-200">
                {contact.extension_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
