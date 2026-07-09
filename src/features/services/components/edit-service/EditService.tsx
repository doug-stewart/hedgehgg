"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Combobox } from "../../../../components/combobox/Combobox";
import { useIcons } from "../../hooks/useIcons";
import { useServices } from "../../hooks/useServices";
import type { Service } from "../../types";

type ServiceInputs = Service;

export const EditService = ({ service }: { service?: Service }) => {
  const { createService } = useServices();
  const [icons, setIcons] = useState<Array<{ label: string; value: string }>>([]);
  const { getIcons, getIconUrl } = useIcons();

  const formProps = useForm<ServiceInputs>({
    defaultValues: { ...service, icon: service?.icon ?? "" },
  });
  const { register, handleSubmit, watch, setValue } = formProps;

  const iconValue = watch("icon");
  const iconUrl = getIconUrl(iconValue);

  const serviceUrl = watch("href");

  const handleIconSearch = (value: string) => {
    const matches = getIcons(value);
    setIcons(matches.map((match) => ({ label: match.Name, value: match.Reference })));
  };

  const onSubmit = (data: ServiceInputs) => {
    console.log(data);
    createService.mutate({ ...data, icon: iconUrl });
  };

  useEffect(() => {
    if (!serviceUrl) return;

    const options = URL.parse(serviceUrl)?.hostname.split(".");
    if (!options) return;

    let match = null;

    for (const option of options) {
      const matches = getIcons(option);
      if (matches.length > 0) {
        match = matches.at(0);
        break;
      }
    }

    if (match) {
      setValue("icon", match.Name);
    }
  }, [serviceUrl, getIcons, setValue]);

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name</span>
          <input {...register("name")} />
        </label>
        <label>
          <span>Abbreviation (2-3 chars)</span>
          <input {...register("abbr")} />
        </label>
        <label>
          <span>URL</span>
          <input {...register("href")} />
        </label>
        <label>
          icon
          {iconUrl && <Image alt="Service Icon" src={iconUrl} />}
          <Combobox
            label="Icon..."
            name="icon"
            onChange={handleIconSearch}
            options={icons.map(({ label, value }) => ({
              label,
              value,
            }))}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};
