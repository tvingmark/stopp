function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Switch({
  checked,
}: {
  checked: boolean;
}) {
  // on click funciton
  return (
    <span
      className={classNames(
        checked
          ? "bg-indigo-500 justify-end"
          : "bg-gray-200 justify-start",
        "border rounded-full border-grey flex items-center cursor-pointer w-12 "
      )}
    >
      <span
        className={classNames(
          checked ? "border-indigo-500" : "border-gray-200",
          "rounded-full border w-6 h-6 bg-white shadow"
        )}
      ></span>
    </span>
  );
}
