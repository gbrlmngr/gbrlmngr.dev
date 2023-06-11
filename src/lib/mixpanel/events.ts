import mixpanel from "mixpanel-browser";

if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== "production",
  });
}

export enum Events {
  SocialIconInteraction = "social_icon_interaction",
  Breadcrumb = "breadcrumb",
  ViewedExperiment = "viewed_experiment",
}

export const identify = (identity?: string) => {
  if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) return;
  return mixpanel.identify(identity ?? "Unidentified");
};

export const track = (
  eventName: string,
  valueOrObject: string | Record<string, string | null>
) => {
  if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) return;

  if (typeof valueOrObject === "string") {
    return mixpanel.track(eventName, {
      Environment: process.env.NODE_ENV,
      Value: valueOrObject,
    });
  }

  return mixpanel.track(eventName, {
    Environment: process.env.NODE_ENV,
    ...valueOrObject,
  });
};
