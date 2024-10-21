import React from 'react'

const SettingSideBar = () => {
  return (
    <aside id="default-sidebar" className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <Link to="/"> Create Action Type</Link>
                            {/* <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="ms-3">Create Action Type</span>
                        </a>
                        </li>  */}
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="ms-3">Create Form</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
  )
}

export default SettingSideBar
