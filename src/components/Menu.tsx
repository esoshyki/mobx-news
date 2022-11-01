import { observer } from "mobx-react";
import NewsApi, { Categories as CategoriesType } from "../store/newsApi";
import Navbar from "react-bootstrap/Navbar";
import { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Categories from "./Categories";
import MenuHot from "./MenuHot";

const Menu = observer(({ newsProvider }: { newsProvider: NewsApi }) => {
  const [mode, setMode] = useState<"headlines" | "all">("headlines");

  return (
    <div className="full-width container-flex-row">
      <Navbar expand="lg">
        <Form.Select
          aria-label="Default select example"
          value={newsProvider.getCurrentLanguage()}
          onChange={(e) =>
            newsProvider.setCurrentLanguage(e.target.value as any)
          }
        >
          <option value={"ru"}>Русский</option>
          <option value={"en"}>English</option>
          <option value={"es"}>Spanish</option>
        </Form.Select>

        <div className="container-flex-row gap15">
          {mode === "headlines" && (
            <Fragment>
              <Categories newsProvider={newsProvider} />
              <MenuHot dataService={newsProvider} />
            </Fragment>
          )}
        </div>
      </Navbar>
    </div>
  );
});

export default Menu;
