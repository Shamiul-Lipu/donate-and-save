import Container from "@/components/Shared/Container/Container";

const SuccessStories = () => {
  const stories = [
    {
      name: "Fatema Islam",
      role: "Blood Donor",
      story:
        "Donating blood through this website was a breeze! The process was smooth, and the staff were very friendly. It feels great to know that I could potentially save someone's life.",
    },
    {
      name: "Mir Hassan",
      role: "Blood Recipient",
      story:
        "I am so grateful to the donors on this website. Their generosity and kindness saved my life. Words cannot express how thankful I am for their selfless act.",
    },
    {
      name: "Firoz ahmed",
      role: "Blood Donor",
      story:
        "I've been donating blood regularly through this website for years. It's a small effort that makes a big difference. Knowing that I'm helping others in need is incredibly rewarding.",
    },
  ];

  return (
    <div className="bg-neutral py-10 flex justify-center items-center">
      <Container>
        <div className="px-6">
          <div className="text-center text-gray-300 px-6 pb-5 lg:px-8">
            <h3 className="text-4xl font-bold">Success Stories</h3>
            <p className="pt-4 max-w-md mx-auto">
              Read testimonials from people whose lives have been impacted by
              blood donations through our website.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-md shadow-md">
                <h4 className="text-xl font-semibold text-cyan-400">
                  {story.name}
                </h4>
                <p className="text-gray-300 text-sm">{story.role}</p>
                <p className="mt-2 text-gray-300 text-base">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessStories;
