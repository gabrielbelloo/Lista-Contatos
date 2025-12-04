import PropTypes from 'prop-types'

export default function IconButton({ icon, tooltip, onClick }) {
    return (
                <div className="flex items-center group">
                  <button
                    type="button"
                    className="cursor-pointer relative rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white"
                    onClick={onClick}
                  >
                    <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-neutral-700/90 text-white text-sm rounded-md px-2 py-2 whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none backdrop-blur-sm shadow-lg">{tooltip}</span>
                    {icon}
                  </button>
                </div>
    )
}

IconButton.propTypes = {
  icon: PropTypes.node,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
}