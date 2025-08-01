import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Contact() {
  const { contactId } = useParams();
  const [contact, setContact] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact/${contactId}`
      )
      .then((res) => {
        setContact(res.data);
      });
  }, [contactId]);

  const handleDelete = () => {
    axios
      .delete(
        `https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact/${contactId}`
      )
      .then((res) => {
        history.push("/");
      });
  };

  if (!contact) return "Böyle bir kullanıcı yok";

  return (
    <div id="contact" className="max-w-2xl flex gap-8 items-center">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          className="w-48 h-48 bg-[#c8c8c8] rounded-3xl object-cover"
        />
      </div>

      <div className="flex-1">
        <h1
          data-testid="full_name"
          className="text-3xl font-bold m-0 leading-tight"
        >
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.email && (
          <p className="m-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
        )}

        <div className="mt-6">
          <button className="text-red-500" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
