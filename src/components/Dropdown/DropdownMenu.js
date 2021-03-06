import UID from "../../scripts/IdGenerator";
import DropdownItem from "./DropdownItem";
import { useSelector } from "react-redux";

function DropdownMenu({ title }) {
  const countries = useSelector((state) => state.countries);

  return (
    <>
      <li className="nav-item dropdown fs-5">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDarkDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark overflow-auto"
          style={{ height: "25rem" }}
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          {countries.map((item) => {
            return (
              <DropdownItem
                key={UID.next().value}
                title={item.names.name}
                coords={item.maps}
                zoom={item.maps.zoom}
                flag={item.flag}
              ></DropdownItem>
            );
          })}
        </ul>
      </li>
    </>
  );
}

export default DropdownMenu;
