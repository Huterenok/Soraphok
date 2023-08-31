import { Instance } from "@milkdown/react";
import { config, CategoriesComponents } from "../../../config";
import { ItemComponent } from "./item";
import {
  categorieElement,
  categories,
  componentsWrapper,
  menuUl,
} from "./menu.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import * as imagesCategories from "./img";
import Image from "next/image";

interface MenuComponentsProps {
  instance: Instance;
  setSelected?: Dispatch<SetStateAction<number>>;
}

export const MenuComponents = ({
  instance,
  setSelected,
}: MenuComponentsProps) => {
  const [selectedCategories, swithcCategories] = useState(
    CategoriesComponents.ALL
  );

  return (
    <div className={menuUl}>
      <div className={categories}>
        {Object.values(CategoriesComponents).map(
          (categorie: string, index: number, thisArray) => (
            <button
              key={categorie}
              className={categorieElement}
              onClick={() => swithcCategories(thisArray[index])}
              style={{
                background:
                  selectedCategories === categorie
                    ? "var(--color-primary)"
                    : "",
              }}
            >
              <Image
                // @ts-ignore
                src={imagesCategories[categorie]}
                alt={categorie}
              />
              {categorie}
            </button>
          )
        )}
      </div>

      <ul className={componentsWrapper}>
        {config[selectedCategories].map((item, i) => (
          <ItemComponent
            key={i.toString()}
            index={i}
            instance={instance}
            onSelect={(ctx) => item.onSelect(ctx)}
            setSelected={setSelected}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </ul>
    </div>
  );
};
