import Image from "next/image";

const AboutUsSection = () => {
  return (
    <>
      <div className="bg-neutral text-gray-300">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-28 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-gray-400">
              Learn more about our mission, our team, and how you can get
              involved in saving lives through blood donation
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">Mission Statement</p>
                <p className="mt-2 text-sm text-gray-400">
                  Our mission is to save lives by promoting and facilitating
                  blood donation. We strive to connect donors with recipients in
                  need, raise awareness about the importance of blood donation,
                  and make the process as easy and accessible as possible.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">Team Information</p>
                <p className="mt-2 text-sm text-gray-400">
                  We are a dedicated team of healthcare professionals,
                  volunteers, and technologists passionate about making a
                  difference. Our team includes doctors, nurses, and software
                  engineers who work tirelessly to ensure that our platform is
                  reliable, user-friendly, and impactful.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">History</p>
                <p className="mt-2 text-sm text-gray-400">
                  Since our founding in 2024, we have helped facilitate
                  thousands of blood donations, saving countless lives. Our
                  journey began with a small group of committed individuals and
                  has grown into a nationwide effort.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">Success Stories</p>
                <p className="mt-2 text-sm text-gray-400">
                  Hear from donors and recipients about how blood donation has
                  made a difference in their lives. These powerful stories
                  inspire us to continue our mission and expand our impact.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">
                  Volunteer Opportunities
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Join our team of volunteers and help us make a difference.
                  Whether you can assist at blood drives, help with
                  administrative tasks, or spread the word about our mission, we
                  have a place for you.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-300">
                  Frequently Asked Questions (FAQs)
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Have questions about blood donation? Check out our FAQs
                  section to find answers to common questions about eligibility,
                  the donation process, and more.
                </p>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="w-64 h-64 bg-slate-800 rounded-lg flex justify-center items-center">
              <Image
                width={250}
                height={250}
                src="https://i.ibb.co/b7LhJQm/aboutus1.png"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
              />
            </div>
            <div className="w-64 h-64 bg-slate-800 rounded-lg flex justify-center items-center">
              <Image
                width={250}
                height={250}
                src="https://i.ibb.co/MCGpT2G/aboutus.png"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              />
            </div>
            <div className="w-64 h-64 bg-slate-800 rounded-lg flex justify-center items-center">
              <Image
                width={250}
                height={250}
                src="https://i.ibb.co/51vr8Ds/aboutus3.png"
                alt="Side of walnut card tray with card groove and recessed card area."
              />
            </div>
            <div className="w-64 h-64 bg-slate-800 rounded-lg flex justify-center items-center">
              <Image
                width={250}
                height={250}
                src="https://i.ibb.co/MB1J1Mf/aboutus4.png"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;
