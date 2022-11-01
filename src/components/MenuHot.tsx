import { observer } from "mobx-react";
import { ChangeEvent, Suspense, useState, useTransition } from "react";
import NewsApi, { Categories as CategoriesType } from "../store/newsApi";
import { countries } from "../store/settings";
import { Form, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const MenuHot = observer(({ dataService }: { dataService: NewsApi }) => {
  const currentCountry = dataService.getCountry();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState("");
  const [countiryList, setCountires] = useState(countries);
  const [showPickCountry, setShowPickCountry] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchValue(e.target.value);
    });
  };

  return (
    <Suspense>
      <div className="container-flex-row full-width relative gap15">
        <Form.Control
          value={searchValue}
          onChange={onChange}
          width={"400px"}
          onFocus={() => setShowPickCountry(true)}
          onBlur={() => setShowPickCountry(false)}
          style={{ width: 300 }}
        />
        <div
          className="card container-flex-col full-width absolute gap5"
          style={{
            display: showPickCountry ? "flex" : "none",
            width: 300,
            top: 40,
            left: 0,
            position: "absolute",
            zIndex: 20,
            maxHeight: 200,
            overflowY: "scroll",
          }}
        >
          {Object.entries(countries)
            .filter(
              ([key, value]) =>
                value.en.match(searchValue) || value.ru.match(searchValue)
            )
            .map(([key, value]) => (
              <ListGroup.Item
                key={key}
                onMouseDown={() => {
                  console.log("click", key);
                  dataService.setCountry(key as keyof typeof countries);
                }}
              >
                <Image src={value.icon} height={20} style={{ height: 20 }} />
                {value[dataService.getCurrentLanguage()]}
              </ListGroup.Item>
            ))}
        </div>

        <div className="container-flex-row gap15 ac" style={{ width: 300 }}>
          <Image
            src={dataService.getCountryIcon() || undefined}
            style={{ height: 20 }}
          />
          <span>{dataService.getCountryString()}</span>
          {dataService.getCountry() && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                dataService.setCountry();
                setSearchValue("");
              }}
            >
              X
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
});

export default MenuHot;
