import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/button/Button";
import buttonStyles from "@/components/button/Button.module.css";
import { profileSchema } from "../../helpers/profileSchema";
import { themes } from "../../helpers/themes";
import { useProfile } from "../../hooks/useProfile";
import type { User } from "../../types";
import styles from "./ProfileForm.module.css";

type ProfileInputs = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  profile: User;
  onFormSubmit?: () => void;
  onFormReset?: () => void;
};

export const ProfileForm = ({ profile, onFormSubmit, onFormReset }: ProfileFormProps) => {
  const initial = {
    geolocation_latitude: profile?.geolocation_latitude ?? "",
    geolocation_longitude: profile?.geolocation_longitude ?? "",
    linkwarden_token: profile?.linkwarden_token ?? "",
    linkwarden_url: profile?.linkwarden_url ?? "",
    sonarr_api_key: profile?.sonarr_api_key ?? "",
    sonarr_url: profile?.sonarr_url ?? "",
    theme: profile?.theme ?? ("" as ProfileInputs["theme"]),
  };

  const formProps = useForm<ProfileInputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(profileSchema),
    values: initial,
  });

  const {
    register,
    handleSubmit,
    setValue,
    setValues,
    formState: { errors },
  } = formProps;

  const { saveProfile } = useProfile();

  const submitProfile: SubmitHandler<ProfileInputs> = async (data) => {
    if (!profile || profile.id === null) return;

    const newProfile = {
      id: profile.id,
      geolocation_latitude: data.geolocation_latitude ?? "",
      geolocation_longitude: data.geolocation_longitude ?? "",
      linkwarden_token: data.linkwarden_token ?? "",
      linkwarden_url: data.linkwarden_url ?? "",
      sonarr_api_key: data.sonarr_api_key ?? "",
      sonarr_url: data.sonarr_url ?? "",
      theme: data.theme || null,
    };

    await saveProfile.mutateAsync(newProfile);

    onFormSubmit?.();
  };

  const resetForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initial);
    onFormReset?.();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = String(position.coords.latitude);
      latitude = latitude.slice(0, latitude.indexOf(".") + 8);

      let longitude = String(position.coords.longitude);
      longitude = longitude.slice(0, longitude.indexOf(".") + 8);

      setValue("geolocation_latitude", latitude);
      setValue("geolocation_longitude", longitude);
    });
  };

  return (
    <FormProvider {...formProps}>
      <form className={styles.form} onReset={resetForm} onSubmit={handleSubmit(submitProfile)}>
        <fieldset className={clsx(styles.fieldset, styles.appearance)}>
          <legend>Appearance</legend>
          <div className={styles.field}>
            {themes.map((theme) => (
              <label
                className={clsx(styles.radio, buttonStyles.button, buttonStyles.secondary)}
                key={theme.value}
              >
                <theme.icon role="presentation" />
                {theme.label}
                <input type="radio" value={theme.value} {...register("theme")} />
              </label>
            ))}
            {errors.theme && <span className={styles.error}>{errors.theme.message}</span>}
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Linkwarden</legend>
          <label className={styles.field}>
            <span className={styles.label}>Token</span>
            <input {...register("linkwarden_token")} />
            {errors.linkwarden_token && (
              <span className={styles.error}>{errors.linkwarden_token.message}</span>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>URL</span>
            <input {...register("linkwarden_url")} />
            {errors.linkwarden_url && (
              <span className={styles.error}>{errors.linkwarden_url.message}</span>
            )}
          </label>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Sonarr</legend>
          <label className={styles.field}>
            <span className={styles.label}>API Key</span>
            <input {...register("sonarr_api_key")} />
            {errors.sonarr_api_key && (
              <span className={styles.error}>{errors.sonarr_api_key.message}</span>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>URL</span>
            <input {...register("sonarr_url")} />
            {errors.sonarr_url && <span className={styles.error}>{errors.sonarr_url.message}</span>}
          </label>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Geolocation</legend>
          <label className={styles.field}>
            <span className={styles.label}>Latitude</span>
            <input {...register("geolocation_latitude")} />
            {errors.geolocation_latitude && (
              <span className={styles.error}>{errors.geolocation_latitude.message}</span>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Longitude</span>
            <input {...register("geolocation_longitude")} />
            {errors.geolocation_longitude && (
              <span className={styles.error}>{errors.geolocation_longitude.message}</span>
            )}
          </label>
          <Button className={styles.getCurrent} kind="inline" onClick={getLocation} type="button">
            Get Current Location
          </Button>
        </fieldset>
        <div className={styles.actions}>
          <Button className={styles.submit} kind="primary" type="submit">
            Save Profile
          </Button>
          <Button className={styles.cancel} kind="inline" type="reset">
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
