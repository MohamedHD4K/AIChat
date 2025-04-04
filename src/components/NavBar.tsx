const NavBar = () => {
    return (
        <div className="flex justify-between p-4 items-center">
            <div className="text-xl font-semibold">AIChat</div>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="images/avatar.png" />
              </div>
            </div>
        </div>
    );
}

export default NavBar;
