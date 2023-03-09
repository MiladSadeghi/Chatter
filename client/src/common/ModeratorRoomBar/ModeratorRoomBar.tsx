import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect } from "react";

type Props = {
  tabs: { name: string; tabNumber: number }[];
  selectedTab: { name: string; tabNumber: number };
  setSelectedTab: any;
};

const ModeratorRoomBar = ({ tabs, selectedTab, setSelectedTab }: Props) => {
  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);
  return (
    <Listbox value={selectedTab.name} onChange={setSelectedTab}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedTab.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {tabs.map((tab: any, tabIdx: number) => (
              <Listbox.Option
                key={tabIdx}
                className={() =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    tab.name === selectedTab.name
                      ? "bg-my-light-purple/[0.1] text-my-light-purple"
                      : "text-gray-900"
                  }`
                }
                value={tab}
              >
                {({ selected }) => (
                  <>
                    {console.log(selected, tab)}
                    <span
                      className={`block truncate ${
                        tab.name === selectedTab.name
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {tab.name}
                    </span>
                    {tab.name === selectedTab.name ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-my-light-purple">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ModeratorRoomBar;
