import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV !== "production",
});

export enum Events {
  SocialIconInteraction = "social_icon_interaction",
}

export const identify = (identity?: string) => {
  return mixpanel.identify(identity ?? "Generic");
};

export const track = (
  eventName: string,
  valueOrObject: string | Record<string, string | null>
) => {
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
