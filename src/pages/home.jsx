import { useState, useEffect } from "react";

function Home() {

    const [isLogoHiding, setIsLogoHiding] = useState(false);
    const [isLogoHidden, setIsLogoHidden] = useState(false);
    const [isTextShowing, setIsTextShowing] = useState(false);

    useEffect(() => {
        if (isLogoHiding) {
            setTimeout(() => {
                setIsLogoHidden(true);
                setIsTextShowing(true);
            }, 400);
        }
    }, [isLogoHiding]);

    const handleClick = () => {
        setIsLogoHiding(true);
    };

    return (
        <>
            <div id="welcomelogo"
                 className={`col-12 justify-content-center mt-5 ${isLogoHiding ? 'logo-hide' : ''} ${isLogoHidden ? 'd-none' : ''}`}
                 onClick={handleClick}>
                <div className="col">
                    <img src="/images/logo_1_1024_64.png" className="img-fluid shadow-img d-block mx-auto" alt="Logo"
                         style={{maxHeight: '600px'}}/>
                </div>
            </div>

            <div id="column-landing"
                 className={`col-12 ms-3 me-3 column-landing ${isTextShowing ? 'text-unhide' : 'text-hide'} ${!isLogoHidden ? 'd-none' : ''}`}
                 style={{width: '99%'}}>
                <h1 className="text-center">LANDING PAGE</h1>
                <hr/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut lffabore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas seeed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorperf.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Laoreet suspendisse interdum
                    consectetur
                    libero id faucibus nisl tincidunt. Orci ac auctor augue mauris augue neque
                    gravida in.
                    Tristique magna sit amet purus gravida. Nunc sed id semper risus. Convallis
                    posuere
                    morbi leo urna. Morbi tincidunt augue interdum velit euismod in. Tempus urna et
                    pharetra
                    pharetra. Lacus viverra vitae congue eu consequat. Sed odio morbi quis commodo
                    odio.
                    Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Posuere
                    sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Elementum
                    tempus
                    egestas sed sed risus pretium quam. Tincidunt nunc pulvinar sapien et ligula
                    ullamcorper.
                </p>
            </div>
        </>
    );
}

export default Home;