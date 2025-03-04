import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Successful Kilimanjaro Climb",
    excerpt: "Prepare for your Kilimanjaro adventure with these essential tips...",
    image: "/placeholder.svg?height=200&width=300&text=Kilimanjaro+Tips",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Best Time to Climb Kilimanjaro",
    excerpt: "Learn about the ideal seasons for climbing Kilimanjaro...",
    image: "/placeholder.svg?height=200&width=300&text=Kilimanjaro+Seasons",
    date: "2023-06-02",
  },
  {
    id: 3,
    title: "Kilimanjaro's Ecological Zones",
    excerpt: "Discover the diverse ecosystems you'll encounter on your climb...",
    image: "/placeholder.svg?height=200&width=300&text=Kilimanjaro+Ecosystems",
    date: "2023-06-20",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Kilimanjaro Climbing Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

