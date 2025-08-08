import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/sections/PageHeader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About AIM - Association of Indian Manufacturers",
  description:
    "Learn about AIM&apos;s mission, vision, history, and leadership. Discover how we empower MSMEs across India through advocacy and support services.",
};

const leadership = [
  {
    name: "Manmohan Agarwal",
    position: "President",
    image: "/images/leadership/manmohan-agarwal.webp",
    bio: "Mr Manmohan Agarwal serves as the President of the Association of Indian Manufacturers (AIM), bringing over four decades of industrial expertise and leadership to the organization.\n\nHe belongs to a reputed industrial house in Lucknow dealing in the manufacture of Paints & Pigments. Mr Agarwal is a Science Graduate (Gold Medalist) from Lucknow University – 1978 and a Chemical Engineer from UDCT Matunga, Mumbai – 1982.\n\nAfter completing Chemical Engineering, he served industries in Gujarat as a Chemical Engineer for 6-7 years, gaining valuable hands-on experience in industrial processes and management.\n\nIn 1989, Mr Agarwal launched his own industry, Manali Pigments Pvt. Ltd in Lucknow, which stands as the only pigment manufacturing industry in the entire North India. Under his visionary leadership, the company has grown into a significant player in the pigment industry, contributing to India's manufacturing sector.\n\nAs President of AIM, Mr Agarwal is committed to fostering the growth of MSMEs across India, advocating for industry-friendly policies, and creating opportunities for Indian manufacturers to compete globally. His extensive experience in both technical and business aspects of manufacturing makes him an invaluable leader for AIM's mission.",
    company: "Manali Pigments Pvt. Ltd",
    companyWebsite: "https://manalipigments.com",
    linkedin: "https://linkedin.com/in/manmohan-agarwal",
  },
  {
    name: "Kulmani Gupta",
    position: "Vice-President",
    image: "/images/leadership/kulmani-gupta.webp",
    bio: "Mr Kulmani Gupta serves as the Vice-President of the Association of Indian Manufacturers (AIM), bringing 27 years of industry experience and technological expertise to the organization.\n\nA distinguished technopreneur, Mr Gupta is a thoughtful brand strategist with 20 years of experience in implementing new technologies, building comprehensive solutions, and providing exceptional client services.\n\nKnown for his unprecedented networking skills, ambitious drive, and outstanding client servicing abilities, Mr Gupta founded Skynetiks Technologies (P) Ltd from the ground up and has successfully transformed it from a startup into one of India's established solution implementing companies.\n\nHis expertise spans across digital transformation, technology consulting, and business process optimization.\n\nAs Vice-President of AIM, Mr Gupta plays a crucial role in driving technological innovation within the manufacturing sector, helping MSMEs adopt modern technologies, and creating digital transformation strategies that enhance competitiveness. His deep understanding of both technology and business processes enables him to bridge the gap between traditional manufacturing and modern digital solutions, making him an essential leader in AIM's mission to modernize Indian manufacturing.",
    company: "Skynetiks Technologies (P) Ltd",
    companyWebsite: "https://skynetiks.com",
    linkedin: "https://linkedin.com/in/kulmani-gupta",
    personalWebsite: "https://kulmanigupta.com",
  },
  {
    name: "Umesh Batra",
    position: "Secretary General",
    image: "/images/leadership/umesh-batra.webp",
    bio: "Mr Umesh Batra serves as the Secretary General of the Association of Indian Manufacturers (AIM), bringing over 30 years of entrepreneurial and export experience to the organization.\n\nAn accomplished entrepreneur and exporter, Mr Batra has extensive experience in handicraft products and has traveled extensively across the globe, interacting with foreign clients and building long-lasting business relationships that have yielded significant results.\n\nHe holds an MBA degree and is professionally qualified in Computer Integrated Systems, which gives him a unique perspective on how systematic approaches can drive progressive outcomes in business.\n\nMr Batra's motto in life, 'Life is an adventure, so live it up,' reflects his dynamic approach to business and leadership.\n\nHis expertise in international trade, export-import operations, and global market dynamics makes him an invaluable asset to AIM's mission of promoting Indian manufacturers on the global stage.\n\nAs Secretary General, Mr Batra oversees the day-to-day operations of AIM, coordinates with various stakeholders, and ensures that the organization's strategic objectives are met efficiently. His extensive network of international contacts and deep understanding of global markets helps AIM create opportunities for Indian manufacturers to expand their reach worldwide.",
    company: "Sai Saburi International",
    companyWebsite: "https://saisaburiinternational.com/",
    linkedin: "https://linkedin.com/in/umesh-batra",
  },
  {
    name: "Abhishek Goel",
    position: "Treasurer",
    image: "/images/leadership/abhishek-goel.webp",
    bio: "Mr Abhishek Goel serves as the Treasurer of the Association of Indian Manufacturers (AIM), bringing extensive experience in business management and financial oversight to the organization.\n\nHe completed his Bachelor of Commerce from Mahatma Jyotiba Phule Vishwavidyalaya and joined his father as an associate in 1995 in the family business that manufactured conveyor chains used in Sugar, Khandsari, and Jaggery industries.\n\nCurrently, Mr Goel successfully runs two manufacturing units: 'SHAKUMBHARI ENGINEERS' which manufactures Conveyor Chains, and 'T.M.T. INDUSTRY' which manufactures teak and imported pine doors.\n\nHis hands-on experience in manufacturing operations, supply chain management, and business development gives him a comprehensive understanding of the challenges and opportunities facing MSMEs in India.\n\nAs Treasurer of AIM, Mr Goel is responsible for managing the organization's financial resources, ensuring transparency in financial operations, and providing strategic financial guidance to support AIM's mission. His practical experience in running manufacturing businesses enables him to understand the financial needs and constraints of MSMEs, making him an effective advocate for financial policies that support the growth of Indian manufacturers.",
    company: "Shakumbhari Engineers & T.M.T. Industry",
    companyWebsite: "https://shakumbhariengineers.com",
    linkedin: "https://linkedin.com/in/abhishek-goel",
  },
  {
    name: "Vipul Kumar Rastogi",
    position: "Member",
    image: "/images/leadership/vipul-kumar-rastogi.webp",
    bio: "Dr Vipul Kumar Rastogi serves as a Member of the Association of Indian Manufacturers (AIM), bringing a unique combination of academic excellence and entrepreneurial experience to the organization.\n\nAt the young age of 20, Dr Rastogi established and successfully ran an NIIT Computer Centre in Kiratpur for three years, demonstrating his early entrepreneurial spirit and business acumen.\n\nHe has completed his Master's, M.Phil., and Ph.D. in History from C.C.S. University Meerut, showcasing his commitment to academic excellence and research.\n\nAdditionally, he holds a Post Graduate Diploma in Journalism & Mass Communication from Amity, Noida, which gives him strong communication and media relations skills.\n\nSince 2010, Dr Rastogi has been actively participating in various leadership roles in the Rotary Club and welfare associations of Industries in Bijnor, demonstrating his commitment to community service and industrial development.\n\nHis diverse background in education, technology, and community service makes him a well-rounded leader who can contribute to AIM's mission from multiple perspectives.\n\nAs a Member of AIM, Dr Rastogi brings valuable insights into educational initiatives, community engagement, and the development of programs that support the growth of MSMEs through knowledge sharing and skill development.",
    company: "Devdaar Association",
    companyWebsite: "https://devdaarassociation.com",
    linkedin: "https://linkedin.com/in/vipul-rastogi",
  },
  {
    name: "Lalit Kumar",
    position: "Member",
    image: "/images/leadership/lalit-kumar.webp",
    bio: "Mr Lalit Kumar serves as a Member of the Association of Indian Manufacturers (AIM), bringing over 50 years of diverse business experience and mentorship expertise to the organization.\n\nAn engineering graduate, Mr Kumar is a veteran in the business world and has successfully mentored many startups and aspiring entrepreneurs throughout his distinguished career.\n\nHis extensive experience spans across various business sectors, giving him a comprehensive understanding of the challenges and opportunities in different industries.\n\nMr Kumar has served in many social organizations and industrial associations as a prominent office bearer, demonstrating his commitment to community development and industrial growth.\n\nCurrently, he runs a packaging material manufacturing unit, Ashoka Box Industries, located in Harthala Industrial Area, Moradabad, UP.\n\nHis hands-on experience in manufacturing operations and his role as a mentor to numerous entrepreneurs make him an invaluable asset to AIM's mission of supporting and developing MSMEs.\n\nAs a Member of AIM, Mr Kumar contributes his wealth of experience in business development, entrepreneurship mentoring, and industrial association management. His ability to guide and support new entrepreneurs, combined with his deep understanding of manufacturing processes, helps AIM create effective programs and initiatives that support the growth and development of Indian manufacturers.",
    company: "Ashoka Box Industries",
    companyWebsite: "https://ashokabox.com",
    linkedin: "https://linkedin.com/in/lalit-kapoor",
  },
  {
    name: "Sunil Rai",
    position: "Member",
    image: "/images/leadership/sunil-rai.webp",
    bio: "Mr Sunil Rai serves as a Member of the Association of Indian Manufacturers (AIM), bringing extensive experience in industrial development and community leadership to the organization.\n\nWith a strong background in manufacturing and industrial processes, Mr Rai has been instrumental in promoting sustainable manufacturing practices and technological innovation within the MSME sector.\n\nHis expertise in industrial automation and process optimization has helped numerous small and medium enterprises improve their operational efficiency and competitiveness.\n\nMr Rai has been actively involved in various industrial associations and has played a key role in organizing industry events, training programs, and networking initiatives that benefit the manufacturing community.\n\nHis commitment to fostering collaboration between different sectors of the manufacturing industry makes him a valuable member of AIM's leadership team.\n\nAs a Member of AIM, Mr Rai contributes his technical expertise and industry knowledge to help develop programs and initiatives that support the growth and modernization of Indian manufacturers.",
    company: "Industrial Solutions Ltd",
    companyWebsite: "https://industrialsolutions.com",
    linkedin: "https://linkedin.com/in/sunil-rai",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="About AIM"
        subtitle="Empowering Indian manufacturers"
      />

      <section>
        <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          The Association of Indian Manufacturers (AIM) is a dynamic
          organization dedicated to fostering, promoting, and coordinating
          cooperative efforts and initiatives for the growth, advancement and
          development of Micro, Small, and Medium Enterprises (MSMEs) in India.
          AIM’s core mission is to harness the collective creative genius of
          MSMEs operating at the district, state, and national levels. AIM’s
          Core objective is to uplift the MSMEs operating at the District,
          State, and National levels by leveraging the capabilities and
          expertise of governmental and non-governmental agencies engaged in the
          development of MSMEs.
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The mission of the Association of Indian Manufacturers (AIM) is
                to empower and represent the interests of Indian manufacturers,
                fostering a vibrant and globally competitive manufacturing
                ecosystem. AIM is committed to driving innovation, promoting
                sustainable practices that facilitate the growth and prosperity
                of the Indian manufacturing sector.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Advocate for MSME-friendly policies at national and state
                    levels
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Provide training and skill development programs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Facilitate networking and business opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Association of Indian Manufacturers (AIM) envisions
                establishing India as a premier global manufacturing powerhouse
                renowned for its innovation, technological excellence,
                high-quality products, and commitment to ethical and sustainable
                business practices. <br></br>AIM aims to foster a thriving
                ecosystem where Indian enterprises especially MSMEs become the
                backbone of industrial growth, significantly contributing to
                national progress. We are committed to playing a pivotal role in
                positioning Indian MSMEs as a key engine of economic development
                and propelling India toward becoming a 5 trillion-dollar economy
                in the near future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History & Milestones */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three decades of dedicated service to Indian manufacturers, marked
              by significant milestones and continuous growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card
                key={index}
                className="text-center h-full transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <CardDescription>{milestone.year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section id="values" className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              The principles that guide everything we do at AIM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-primary-100">
                Maintaining the highest standards of ethical conduct and
                transparency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-primary-100">
                Working together with stakeholders to achieve common goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-primary-100">
                Embracing new ideas and technologies to drive progress.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-primary-100">
                Striving for the highest quality in all our services and
                initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide AIM&apos;s mission and drive
              our organization forward.
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-8">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                className="transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <div className="w-28 h-28 rounded-full mx-auto md:mx-0 overflow-hidden relative">
                        <Image
                          src={leader.image}
                          alt={`${leader.name} - ${leader.position}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <CardTitle className="text-xl mb-2">
                        {leader.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium mb-1">
                        {leader.position}
                      </CardDescription>
                      {leader.company && (
                        <CardDescription className="text-primary-600 font-medium">
                          {leader.company}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 leading-relaxed mb-6 space-y-4">
                    {leader.bio.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start space-x-4">
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                    {leader.companyWebsite && (
                      <a
                        href={leader.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                        title="Company Website"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <span className="text-sm">Company Website</span>
                      </a>
                    )}
                    {leader.personalWebsite && (
                      <a
                        href={leader.personalWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                        title="Personal Website"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm">Personal Website</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
