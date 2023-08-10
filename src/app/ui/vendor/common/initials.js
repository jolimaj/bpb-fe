export default () => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  const getInitials = (string) => {
    let initials = [...string.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    return initials;
  };

  return {
    getInitials,
  };
};
