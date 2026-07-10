import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Combobox } from "../../../../components/combobox/Combobox";
import { useIcons } from "../../hooks/useIcons";
import { useServices } from "../../hooks/useServices";
import type { Service } from "../../types";

type ServiceInputs = Service;

export const ServiceForm = ({
  service,
  onSubmit,
}: {
  service?: Service;
  onSubmit?: () => void;
}) => {
  const [icons, setIcons] = useState<Array<{ label: string; value: string }>>([]);
  const { createService, updateService } = useServices();
  const { getIcons, getIconUrl } = useIcons();

  const formProps = useForm<ServiceInputs>({
    defaultValues: { ...service, icon: service?.icon ?? "" },
  });
  const { register, handleSubmit, watch, setValue, reset } = formProps;
  const serviceUrl = watch("href");
  const iconValue = watch("icon");
  const iconUrl = service?.icon || getIconUrl(iconValue);

  const handleIconSearch = (value: string) => {
    const matches = getIcons(value);
    setIcons(matches.map((match) => ({ label: match.Name, value: match.Reference })));
  };

  const submitForm = async (data: ServiceInputs) => {
    if (service) {
      await updateService.mutateAsync({ ...data, icon: iconUrl });
    } else {
      await createService.mutateAsync({ ...data, icon: iconUrl });
    }
    reset();
    onSubmit?.();
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
      <form onSubmit={handleSubmit(submitForm)}>
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
          {/* biome-ignore lint/performance/noImgElement: External service and I don't want them cached */}
          {iconUrl && <img alt="Service Icon" height={48} src={iconUrl} width={48} />}
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
