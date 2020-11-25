// tslint:disable:max-line-length
export default `
<!DOCTYPE HTML>
<!-- Seq 3.129 [Req 307] Embed all resources in the ACS-provided HTML and do not fetch via external URLs. -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global Payments - 3DS2 Mock Challenge Page</title>
    <style>
        body {
            font-family: 'Trebuchet MS', Helvetica, sans-serif;
            background: white;
        }

        input[type=submit] {
            font-family: 'Trebuchet MS', Helvetica, sans-serif;
            background-color: #0070ba;
            border: none;
            color: white;
            padding: 16px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 16px 8px;
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
            cursor: pointer;
        }

        input[type=submit]:hover {
            background-color: #06477c;
        }

        div#content {
            margin: auto;
            max-width: 960px;
        }

        div#title {
            text-align: center;
            vertical-align: middle;
            font-weight: bold;
        }

        div#form-container {
            text-align: center;
        }

        div#title {
            text-align: center;
            vertical-align: middle;
            font-weight: bold;
        }

        div#diagnostics {
            font-family: 'Courier New', Courier, monospace;
            padding: 4px;
            background-color: #F8F9FC;
            font-size: 11px;
            word-wrap: break-word;
        }

        img#logo {
            height: 32px;
            padding: 4px;
            vertical-align: middle;
        }
    </style>
    <script type="application/javascript">
        /*<![CDATA[*/
        var submitted = false;

        var submitChallengeResult = function (passed) {

            if(submitted) {
                return;
            }

            submitted = true;

            var cres = {};
            var sessionData = null;

            var formElements = document.getElementById('challenge-form').querySelectorAll("input[type=hidden]");

            for(var i = 0; i < formElements.length; i++) {
                var formElement = formElements[i];

                if (formElement.name === "transStatus") {
                    cres["transStatus"] = passed ? "Y" : "N";
                } else if (formElement.name === "threeDSSessionData") {
                    sessionData = formElement.value
                } else {
                    cres[formElement.name] = formElement.value;
                }
            }

            postCres(getNotificationUrl(), cres, sessionData);
        };

        var postCres = function (url, cres, sessionData) {
            var submitForm = document.createElement("form");
            submitForm.action = url;
            submitForm.method = 'POST';
            submitForm.target = '_self';
            submitForm.enctype = 'application/x-www-form-urlencoded';

            var cresEncoded = base64UrlEncode(JSON.stringify(cres));

            submitForm.appendChild(createHiddenFormElement("cres", cresEncoded));

            if (sessionData != null) {
                var sessionDataEncoded = base64UrlEncode(sessionData);
                submitForm.appendChild(createHiddenFormElement("threeDSSessionData", sessionDataEncoded));
            }

            document.body.appendChild(submitForm);
            submitForm.submit();
        };

        var createHiddenFormElement = function (name, value) {
            var element = document.createElement("input");
            element.setAttribute("type", "hidden");
            element.setAttribute("name", name);
            element.setAttribute("value", value);
            return element;
        };

        var base64UrlEncode = function (input) {
            return btoa(input)
                .replace(/[+]/g, '-') // 62nd character
                .replace(/[/]/g, '_') // 63rd character
                .replace(/[=]/g, ''); // padding not needed
        };

        var getNotificationUrl =  function () {
            var parentUrl = (window.location !== window.parent.location)
                ? document.referrer
                : document.location.href;

            var urlFragments = parentUrl.split("/");

            return urlFragments[0] + "//" + urlFragments[2] + "/3ds2/challengeNotification";
        };

        var startTimer = function () {
            setTimeout(function () {
                submitChallengeResult(false);
            }, 10000);
        };
        /*]]>*/
    </script>
</head>
<body onload="startTimer()">
    <div id="content">

        <div id="title">
            <img alt="Global Payments" id="logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2MnB4IiBoZWlnaHQ9IjE2N3B4IiB2aWV3Qm94PSIwIDAgMTYyIDE2NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDguMiAoNDczMjcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkdsb2JhbFBheW1lbnRzX1N5bWJvbF9QTVM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iQ29tcG9uZW50cyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUyLjAwMDAwMCwgLTQwMS4wMDAwMDApIj4KICAgICAgICA8ZyBpZD0iR2xvYmFsUGF5bWVudHNfU3ltYm9sX1BNUyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIuMDAwMDAwLCA0MDEuMDAwMDAwKSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjUsMTEuNSBDMTI1LDE3Ljg1MTUyODcgMTE5Ljg1MTE1NCwyMyAxMTMuNSwyMyBDMTA3LjE0ODQ3MSwyMyAxMDIsMTcuODUxNTI4NyAxMDIsMTEuNSBDMTAyLDUuMTQ4ODQ1NzcgMTA3LjE0ODQ3MSwwIDExMy41LDAgQzExOS44NTExNTQsMCAxMjUsNS4xNDg4NDU3NyAxMjUsMTEuNSIgaWQ9IkZpbGwtMSIgZmlsbD0iIzAwNkQ0NyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNzkuMDAwMzcyLDY2IEM4Ny45OTk4NTEyLDY2IDk0LDYwLjE3NjkzODkgOTQsNTEuMTc2NzE1NyBDOTQsNDIuMTc2MTIwNCA4Ny44MjM4Nzk2LDM2IDc4LjQ3MDIyNSwzNiBDNzAuMDAwMTQ4OCwzNiA2NCw0Mi4wMDAxNDg4IDY0LDUxLjUyOTc3NSBDNjQsNjAuNzA2MzQxOSA2OS42NDY3MTc0LDY2IDc5LjAwMDM3Miw2NiIgaWQ9IkZpbGwtMiIgZmlsbD0iIzAwM0M2OCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOTAuMzUzNTkwOSwxMTQuMDYxNDg4IEw2OS41NzYxMjMyLDExMyBDNjMuMDcxNDI4NiwxMTYuMDA4NzMxIDYwLDExOC44Mzk4NjMgNjAsMTIyLjczNDcyMSBDNjAsMTI4Ljc1MjE4MyA2Ni44NjYxNTExLDEzMyA3OC40MjkzMzMyLDEzMyBDOTQuMTQ3MTcwOCwxMzMgMTAzLDEyOC4wNDM2NTMgMTAzLDEyMS40OTUyNjIgQzEwMywxMTYuMzYzNTU1IDk4Ljg0NDk2MzUsMTE0LjQxNjY4NSA5MC4zNTM1OTA5LDExNC4wNjE0ODgiIGlkPSJGaWxsLTMiIGZpbGw9IiMwMDNDNjgiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTc4LjMwODM1NDgsMTQ5Ljg3MzIzNSBDNTEuOTI3MjQzNCwxNDkuODczMjM1IDM4LjQ2ODQ1MDEsMTQxLjYxNjQ5MiAzOC40Njg0NTAxLDEyNi4zNjIwOTggQzM4LjQ2ODQ1MDEsMTE3LjU2OTI1NiA0My42NzIwMzI2LDExMi43MjM5NDMgNTQuNzk4NDA3MywxMDkuMTM0Njk2IEM0Ni4zNjM0ODg2LDEwNS4wMDc0NTkgNDIuNDE1NTkxLDEwMS4yMzg1MDQgNDIuNDE1NTkxLDk0Ljc3ODA4NjYgQzQyLjQxNTU5MSw4OC4xMzY0NDc1IDQ3LjI2MDg5MjgsODEuNjc2NDA4NCA1Ni40MTM4ODYyLDc3LjAxMDA0NjggQzQ3LjgwMDAxNjMsNzEuODA1MzE3MiA0My4zMTI5OTUyLDYzLjM3MDc1NzIgNDMuMzEyOTk1Miw1Mi40MjQwNjQ4IEM0My4zMTI5OTUyLDMzLjIyMTAwNzMgNTcuNjcwMzI3OCwxOS43NjIxODI2IDc5LjAyNTY3MjksMTkuNzYyMTgyNiBDODcuNzg4MjI3MywxOS43NjIxODI2IDk2LjUxMDY3ODUsMjIuNTg5ODQ0OCAxMDMuMjE1ODYyLDI4LjMwOTQ4NTkgQzEwNy42NDgwMjUsMzIuMDkwMTY5NCAxMTEuMTI4NjgyLDM3LjA0MDI4MDggMTEzLjAzODEyNSw0Mi41NTQxMDg3IEMxMTQuMzMwODg3LDQ2LjI4Nzg3ODkgMTE0LjczODcyOSw1MC4yODY4NjA2IDExNC43Mzg3MjksNTQuMjE4NDk5MSBDMTE0LjczODcyOSw3Mi4zNDQ0NDIgMTAxLjQ1ODUwOCw4NC4xODc3ODQgNzkuNTY0Nzk2NCw4NC4xODc3ODQgQzc1LjYxNjg5ODgsODQuMTg3Nzg0IDcyLjIwNjYxMTUsODMuODI5ODgwOCA2OS4zMzQ2OTEsODMuMTExODA0NSBDNjUuMjA3NDYzOSw4NC43MjcyODcyIDYzLjIzMzcwNDMsODYuODgwNzU5NyA2My4yMzM3MDQzLDg5LjM5MjUxMzcgQzYzLjIzMzcwNDMsOTUuNjc0NzM2MiA3MS44NDc1NzQxLDk1LjEzNjM2ODEgODcuOTk5MzM2OCw5Ni4zOTI4MTI2IEMxMTIuMjI1ODQ2LDk4LjE4NzI0NjkgMTIyLjQ1NTk1MSwxMDIuODUyODUyIDEyMi40NTU5NTEsMTIwLjgwMDIyMSBDMTIyLjQ1NTk1MSwxMzkuMjg0MDY4IDEwNy4yMDE1OTMsMTQ5Ljg3MzIzNSA3OC4zMDgzNTQ4LDE0OS44NzMyMzUgWiBNMTI3LjA2NzA2NSwxOS4zNzM2MzQ0IEMxMjQuNTM5ODA1LDIzLjk5ODAwMDkgMTE5LjYzMjQ1NywyNy4xMzQ3NjEzIDExMy45OTE1MjMsMjcuMTM0NzYxMyBDMTA1Ljc2NjIsMjcuMTM0NzYxMyA5OS4wOTgwOTMyLDIwLjQ2NzAxNzMgOTkuMDk4MDkzMiwxMi4yNDE2NzU1IEM5OS4wOTgwOTMyLDEwLjQ4NDY5NjIgOTkuNDE4NTQwNiw4LjgwNjAzMTg1IDk5Ljk3Njk1OTEsNy4yNDA4Njc0NiBDOTMuODg5MjE0LDUuNzc5MzY2MzYgODcuNTM1ODc5Nyw1IDgwLjk5OTgxMDgsNSBDMzYuMjY1MDQyOCw1IDAsNDEuMjY0NzQ5MiAwLDg1Ljk5OTYyMTcgQzAsMTMwLjczNTI1MSAzNi4yNjUwNDI4LDE2NyA4MC45OTk4MTA4LDE2NyBDMTI1LjczNDk1NywxNjcgMTYyLDEzMC43MzUyNTEgMTYyLDg1Ljk5OTYyMTcgQzE2Miw1OC4zODAxNjQxIDE0OC4xNzI3MTEsMzMuOTk0MzIwMyAxMjcuMDY3MDY1LDE5LjM3MzYzNDQgWiIgaWQ9IkZpbGwtNCIgZmlsbD0iIzAwM0M2OCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
            3DS2 Challenge Required
        </div>

        <div id="form-container">
            <form id="challenge-form" onsubmit="submitChallengeResult(true); return false">
                <input type="hidden" name="threeDSServerTransID" value="f020fae1-daeb-44d6-9eab-a0c05f3692a4" />
                <input type="hidden" name="acsTransID" value="2bfc1409-5347-4fe2-9bd7-08ba78abb5d2" />
                <input type="hidden" name="messageType" value="CRes" />
                <input type="hidden" name="messageVersion" value="2.1.0" />
                <input type="hidden" name="transStatus" value="" />
                <input type="hidden" name="threeDSSessionData" value="" />
                <input type="hidden" name="challengeCompletionInd" value="Y" />
                <input type="submit" value="Pass Challenge" />
            </form>
        </div>

        <div id="diagnostics">
            <p>
                <p>
            <b>3DS Server Transaction ID:</b> <br />
                    f020fae1-daeb-44d6-9eab-a0c05f3692a4
                </p>
                <p>
                    <b>ACS Transaction ID:</b> <br />
                    2bfc1409-5347-4fe2-9bd7-08ba78abb5d2
                </p>
                <p>
                    <b>Challenge Window Size:</b> 04
                </p>
                <p>
                    <b>Message Type:</b> CReq
                </p>
                <p>
                    <b>Message Version:</b> 2.1.0
                </p>
            </p>
            <p>
                <b>Session Data:</b> <br />
            <p>
        </div>
    </div>
</body>
</html>
`;
