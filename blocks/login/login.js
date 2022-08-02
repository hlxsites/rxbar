function createLoginForm() {
  const loginBlock = document.createElement('div');
  loginBlock.innerHTML = /* html */`
    <form class="form form-login">           
      <fieldset class="fieldset" data-hasrequired="* Required Fields">
          <div class="field email required" data-custom-input="true">
            <label class="label" for="email"><span>Email</span></label>
            <div class="control">
                <input name="login[username]" value="" autocomplete="off" id="email" type="email" class="input-text has-placeholder" title="Email" aria-required="true">
            </div>
          </div>
          <div class="field password required" data-custom-input="true">
            <label for="pass" class="label"><span>Password</span></label>
            <div class="control">
                <input name="login[password]" type="password" autocomplete="off" class="input-text has-placeholder" id="pass" title="Password" aria-required="true">
            </div>
          </div>
          <div class="actions-toolbar">
            <div class="primary"><button type="submit" class="action login primary" name="send" id="send2"><span>Login</span></button></div>
            <div class="secondary"><a class="action remind" href="https://wholesale.rxbar.com/customer/account/forgotpassword/"><span>Forgot Your Password?</span></a></div>
          </div>
      </fieldset>
    </form>
  `;

  return loginBlock;
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const registeredCol = block.querySelector('.login > div div:nth-of-type(2)');
  registeredCol.append(createLoginForm());

  const loginButton = registeredCol.querySelector('button.login');
  loginButton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    const userName = registeredCol.querySelector('[name="login[username]"').value;
    const password = registeredCol.querySelector('[name="login[password]"').value;
    const res = await window.StorefrontSDK.generateCustomerToken(userName, password);
    if (res) {
      window.StorefrontSDK.customerToken = res;
    }
  });
}
