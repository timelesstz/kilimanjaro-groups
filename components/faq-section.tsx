"use client"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"

const faqs = [
  {
    question: "What is the best time to climb Kilimanjaro?",
    answer:
      "The best time to climb Kilimanjaro is during the dry seasons, which are from late June to October and from late December to March. These periods offer the most favorable weather conditions for trekking.",
  },
  {
    question: "How fit do I need to be to climb Kilimanjaro?",
    answer:
      "While you don't need to be an elite athlete, a good level of fitness is required. Regular cardio exercises and strength training in the months leading up to your climb will greatly improve your chances of success and enjoyment of the trek.",
  },
  {
    question: "What is altitude sickness and how can I prevent it?",
    answer:
      "Altitude sickness occurs when you ascend too quickly without proper acclimatization. Symptoms include headache, nausea, and fatigue. To prevent it, choose a longer route with a gradual ascent, stay hydrated, and consider taking Diamox after consulting with your doctor.",
  },
  {
    question: "What equipment do I need for the climb?",
    answer:
      "Essential equipment includes warm, waterproof clothing, sturdy hiking boots, a good quality sleeping bag, and trekking poles. We provide a comprehensive packing list to all our clients to ensure you're fully prepared.",
  },
  {
    question: "Are your guides certified and experienced?",
    answer:
      "Yes, all our guides are certified by Kilimanjaro National Park and have extensive experience leading climbs. They are trained in first aid and altitude sickness prevention and management.",
  },
]

export function FAQSection() {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <Disclosure as="div" key={index} className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary-light px-4 py-2 text-left text-sm font-medium text-primary hover:bg-primary-light focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-primary`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">{faq.answer}</Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

