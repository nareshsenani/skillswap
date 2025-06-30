function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-4 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm">&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>

        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Use</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
